const Banner = ({ role }: { role: string }) => {
  const bannerMap = new Map([
    ["WINNER", "bg-success"],
    ["BUSTED", "bg-danger"],
    ["BLACKJACK", "bg-warning"],
    ["TIE", "bg-info"],
  ]);

  if (bannerMap.has(role)) {
    return (
      <div
        key={role}
        className={`alert ${bannerMap.get(role)} text-center p-2`}
      >
        <h6 className="text-primary mb-0">{role}</h6>
      </div>
    );
  }
};

export default Banner;
