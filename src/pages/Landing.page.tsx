import localStore from "@/lib/storage/localStore";
import Button from "@/modules/common/components/Button";
import PageLayout from "@/modules/common/components/PageLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  // simple input, no need for useForm
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>();

  const handleClick = () => {
    if (userName) {
      localStore.save("loopFeedUserName", userName);
    }
    navigate("/dashboard/feed");
  };

  return (
    <PageLayout>
      <section className="h-full grow flex flex-col items-center justify-center bg-primary-light">
        <h1 className="text-3xl mb-6">Welcome To Loop Feed</h1>
        <p className="text-center text-4xl md:text-6xl max-w-[700px] mb-12">
          A Personalized News Aggregator platform you can call your own
        </p>

        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter User Name (Optional)"
          className="border-2 text-center bg-white rounded-lg border-primary px-6 py-4 text-lg mb-12 md:min-w-100"
        />
        <Button onClick={handleClick} href="/dashboard/feed">
          Get Started
        </Button>
      </section>
    </PageLayout>
  );
}
