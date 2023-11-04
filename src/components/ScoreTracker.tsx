interface ScoreTrackerProps {
  winCount: { [key: string]: number };
}

function ScoreTracker({ winCount }: ScoreTrackerProps) {
  return (
    <div className="mt-10 sm:mt-8 md:mt-6 xl:mt-10 2xl:mt-12 text-center text-2xl">
      <span className="bold uppercase text-orange-400">Crosses</span>{" "}
      {`${winCount.cross} : ${winCount.circle}`}
      <span className="bold uppercase text-violet-500"> Circles</span>
    </div>
  );
}

export default ScoreTracker;
