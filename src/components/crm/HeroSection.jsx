import { useAuth } from "../../context/AuthContext";
import GuestHero from "./GuestHero";
import MemberHero from "./MemberHero";

export default function HeroSection() {
  const { user } = useAuth();

  if (user) {
    return <MemberHero user={user} />;
  }

  return <GuestHero />;
}
