'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  User,
  Building2,
  Bell,
  Shield,
  Camera,
  Plus,
  Trash2,
  Check,
  X,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'profile' | 'organization' | 'preferences';

interface Member {
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Viewer';
  initials: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'preferences', label: 'Preferences', icon: Bell },
];

const INITIAL_MEMBERS: Member[] = [
  { name: 'Jane Doe', email: 'jane@acme.com', role: 'Admin', initials: 'JD' },
  { name: 'Alex Kim', email: 'alex@acme.com', role: 'Member', initials: 'AK' },
  { name: 'Sam Patel', email: 'sam@acme.com', role: 'Member', initials: 'SP' },
];

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-bg-card rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-bg-surface">
        <p className="font-mono text-[11px] text-muted uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  rightElement,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs text-muted">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-bg-surface border rounded-md px-3 py-2 text-sm text-text font-mono placeholder:text-muted/50 focus:outline-none transition-colors ${
            error ? 'border-red/60 focus:border-red' : 'border-border focus:border-cyan/50'
          }`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red font-mono">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

function SaveButton({
  label = 'Save Changes',
  onClick,
  disabled,
}: {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-colors ${
        saved
          ? 'bg-green text-white'
          : disabled
            ? 'bg-bg-surface border border-border text-muted cursor-not-allowed'
            : 'bg-text text-bg-primary hover:bg-white'
      }`}
    >
      {saved ? <Check className="w-3.5 h-3.5" /> : null}
      {saved ? 'Saved!' : label}
    </button>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted font-mono mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
          checked ? 'bg-cyan' : 'bg-bg-surface border border-border'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@acme.com');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwErrors, setPwErrors] = useState<{ current?: string; new?: string; confirm?: string }>(
    {}
  );

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const validatePassword = useCallback(() => {
    const errs: typeof pwErrors = {};
    if (!currentPassword) errs.current = 'Current password is required';
    if (!newPassword) errs.new = 'New password is required';
    else if (newPassword.length < 8) errs.new = 'Must be at least 8 characters';
    if (!confirmPassword) errs.confirm = 'Please confirm your new password';
    else if (newPassword !== confirmPassword) errs.confirm = 'Passwords do not match';
    setPwErrors(errs);
    return Object.keys(errs).length === 0;
  }, [currentPassword, newPassword, confirmPassword]);

  const handlePasswordSave = () => {
    if (validatePassword()) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPwErrors({});
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Avatar */}
      <SectionCard title="Avatar">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue flex items-center justify-center font-mono text-lg font-bold text-white select-none">
                {initials}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bg-surface border border-border flex items-center justify-center hover:border-cyan/50 transition-colors"
              title="Change avatar"
            >
              <Camera className="w-3 h-3 text-muted" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-medium">{displayName || 'Your Name'}</p>
            <p className="text-xs text-muted font-mono mt-0.5">Admin · ACME Corp</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-[11px] font-mono text-cyan hover:underline"
            >
              Upload new photo
            </button>
            {avatarUrl && (
              <button
                onClick={() => setAvatarUrl(null)}
                className="ml-3 mt-2 text-[11px] font-mono text-muted hover:text-red transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Personal Information */}
      <SectionCard title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Display Name" value={displayName} onChange={setDisplayName} />
          <Field label="Email" type="email" value={email} onChange={setEmail} />
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton />
        </div>
      </SectionCard>

      {/* Change Password */}
      <SectionCard title="Change Password">
        <div className="flex flex-col gap-4">
          <Field
            label="Current Password"
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={(v) => {
              setCurrentPassword(v);
              setPwErrors((e) => ({ ...e, current: undefined }));
            }}
            placeholder="••••••••"
            error={pwErrors.current}
            rightElement={
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-muted hover:text-text transition-colors"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="New Password"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(v) => {
                setNewPassword(v);
                setPwErrors((e) => ({ ...e, new: undefined }));
              }}
              placeholder="••••••••"
              error={pwErrors.new}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="text-muted hover:text-text transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <Field
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(v) => {
                setConfirmPassword(v);
                setPwErrors((e) => ({ ...e, confirm: undefined }));
              }}
              placeholder="••••••••"
              error={pwErrors.confirm}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-muted hover:text-text transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </div>
          <div className="flex justify-end">
            <SaveButton label="Update Password" onClick={handlePasswordSave} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Organization Tab ─────────────────────────────────────────────────────────

function OrganizationTab() {
  const [orgName, setOrgName] = useState('ACME Corp');
  const [orgSlug, setOrgSlug] = useState('acme-corp');
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');

  const handleRoleChange = (email: string, role: Member['role']) => {
    setMembers((prev) => prev.map((m) => (m.email === email ? { ...m, role } : m)));
  };

  const handleRemove = (email: string) => {
    setMembers((prev) => prev.filter((m) => m.email !== email));
  };

  const handleInvite = () => {
    setInviteError('');
    setInviteSuccess('');

    if (!inviteEmail.trim()) {
      setInviteError('Email address is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      setInviteError('Please enter a valid email address');
      return;
    }
    if (members.some((m) => m.email === inviteEmail)) {
      setInviteError('This person is already a member');
      return;
    }

    const namePart = inviteEmail.split('@')[0];
    const displayName = namePart.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const initials = displayName
      .split(' ')
      .map((w: string) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    setMembers((prev) => [
      ...prev,
      { name: displayName, email: inviteEmail, role: 'Member', initials },
    ]);
    setInviteSuccess(`Invite sent to ${inviteEmail}`);
    setInviteEmail('');
    setTimeout(() => setInviteSuccess(''), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Organization Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Organization Name" value={orgName} onChange={setOrgName} />
          <Field label="Slug" value={orgSlug} onChange={setOrgSlug} />
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton />
        </div>
      </SectionCard>

      <SectionCard title="Team Members">
        <div className="flex flex-col gap-0 mb-4">
          {members.length === 0 && (
            <p className="text-sm text-muted font-mono py-4 text-center">No team members yet.</p>
          )}
          {members.map((m) => (
            <div
              key={m.email}
              className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center font-mono text-[11px] font-bold text-blue shrink-0">
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{m.name}</p>
                  <p className="text-xs text-muted font-mono truncate">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <select
                  value={m.role}
                  onChange={(e) => handleRoleChange(m.email, e.target.value as Member['role'])}
                  disabled={m.role === 'Admin'}
                  className="bg-bg-surface border border-border rounded px-2 py-1 font-mono text-xs text-text focus:outline-none focus:border-cyan/50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
                {m.role !== 'Admin' ? (
                  <button
                    onClick={() => handleRemove(m.email)}
                    className="text-muted hover:text-red transition-colors p-1 rounded hover:bg-red/10"
                    title={`Remove ${m.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-5.5 h-5.5" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Invite Row */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => {
                setInviteEmail(e.target.value);
                setInviteError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
              placeholder="colleague@company.com"
              className={`flex-1 bg-bg-surface border rounded-md px-3 py-2 text-sm text-text font-mono placeholder:text-muted/50 focus:outline-none transition-colors ${
                inviteError
                  ? 'border-red/60 focus:border-red'
                  : 'border-border focus:border-cyan/50'
              }`}
            />
            <button
              onClick={handleInvite}
              className="flex items-center gap-1.5 bg-bg-surface border border-border hover:border-cyan/50 text-text px-3 py-2 rounded-md font-mono text-xs transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              Invite
            </button>
          </div>
          {inviteError && (
            <p className="flex items-center gap-1 text-[11px] text-red font-mono">
              <AlertCircle className="w-3 h-3" />
              {inviteError}
            </p>
          )}
          {inviteSuccess && (
            <p className="flex items-center gap-1 text-[11px] text-green font-mono">
              <Check className="w-3 h-3" />
              {inviteSuccess}
            </p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Preferences Tab ──────────────────────────────────────────────────────────

interface NotifPrefs {
  incidentAlerts: boolean;
  aiInsights: boolean;
  weeklyDigest: boolean;
  memberJoined: boolean;
}

function PreferencesTab() {
  const [notifs, setNotifs] = useState<NotifPrefs>({
    incidentAlerts: true,
    aiInsights: true,
    weeklyDigest: false,
    memberJoined: false,
  });
  const [theme, setTheme] = useState('dark');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const setNotif = (key: keyof NotifPrefs) => (v: boolean) =>
    setNotifs((prev) => ({ ...prev, [key]: v }));

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Notifications">
        <Toggle
          label="Incident Alerts"
          description="Get notified when a new incident is created"
          checked={notifs.incidentAlerts}
          onChange={setNotif('incidentAlerts')}
        />
        <Toggle
          label="AI Insights Ready"
          description="Notify when causality analysis completes"
          checked={notifs.aiInsights}
          onChange={setNotif('aiInsights')}
        />
        <Toggle
          label="Weekly Digest"
          description="Summary of incidents and metrics every Monday"
          checked={notifs.weeklyDigest}
          onChange={setNotif('weeklyDigest')}
        />
        <Toggle
          label="Member Joined"
          description="Notify when someone joins your organization"
          checked={notifs.memberJoined}
          onChange={setNotif('memberJoined')}
        />
        <div className="pt-4 flex justify-end">
          <SaveButton />
        </div>
      </SectionCard>

      <SectionCard title="Appearance">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-muted">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-bg-surface border border-border rounded-md px-3 py-2 text-sm text-text font-mono focus:outline-none focus:border-cyan/50 w-48"
          >
            <option value="dark">Dark (Default)</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton />
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone">
        {!deleteConfirm ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red">Delete Account</p>
              <p className="text-xs text-muted font-mono mt-0.5">
                Permanently remove your account and all data
              </p>
            </div>
            <button
              onClick={() => setDeleteConfirm(true)}
              className="flex items-center gap-1.5 border border-red/30 text-red hover:bg-red/10 px-3 py-2 rounded-md font-mono text-xs transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-red font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex items-center gap-1.5 bg-bg-surface border border-border hover:border-border-hover text-text px-3 py-2 rounded-md font-mono text-xs transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
              <button className="flex items-center gap-1.5 bg-red/20 border border-red/40 text-red hover:bg-red/30 px-3 py-2 rounded-md font-mono text-xs transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                Yes, delete my account
              </button>
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const TabContent =
    activeTab === 'profile'
      ? ProfileTab
      : activeTab === 'organization'
        ? OrganizationTab
        : PreferencesTab;

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted text-sm font-mono mt-1">
          Manage your profile, organization, and preferences
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 flex-1 min-h-0">
        {/* Tab Nav */}
        <nav className="sm:w-44 shrink-0 flex sm:flex-col gap-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`settings-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-all duration-150 ${
                  isActive
                    ? 'bg-bg-surface text-text border border-border'
                    : 'text-muted hover:text-text hover:bg-bg-surface/50 border border-transparent'
                }`}
              >
                <tab.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan' : 'text-muted'}`} />
                <span className="font-mono text-xs">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="flex-1 min-w-0 overflow-auto">
          <TabContent />
        </div>
      </div>
    </div>
  );
}
