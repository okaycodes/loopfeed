import localStore from "@/lib/storage/localStore";

export default function UserGreeting() {
  const userName = localStore.retrieve("loopFeedUserName");

  return (
    <div>
      <h1 className="text-4xl mb-2">Hi {userName ?? "Guest"},</h1>
      <p className="text-2xl text-gray-500">Browse News Feed</p>
    </div>
  );
}
