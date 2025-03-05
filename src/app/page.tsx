import CountdownTimer from "@/components/CountdownTimer";

const countdownDate = new Date('2025-03-07T17:00:00');

export default function Home() {
  return (
      <CountdownTimer
        deadline={countdownDate}
        title={"合格発表まで"}
      />
  );
}
