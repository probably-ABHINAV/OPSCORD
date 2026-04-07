// Stack Auth handler route
// Uncomment and configure once you have valid Stack Auth keys

// import { StackHandler } from "@stackframe/stack";
// import { stackApp } from "@/lib/stackApp";

// export default function Handler(props: any) {
//   return <StackHandler app={stackApp} {...props} />;
// }

export default function StackHandlerPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--muted)",
        fontSize: 14,
      }}
    >
      <p>Stack Auth handler — configure your keys in .env.local to enable</p>
    </div>
  );
}
