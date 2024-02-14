const Banner = ({ role }: { role: string }) => {
  const bannerMap = new Map([
    ["WINNER", "bg-success"],
    ["BUSTED", "bg-danger"],
    ["BLACKJACK", "bg-warning"],
  ]);

  if (bannerMap.has(role)) {
    return (
      <div key={role} className={`alert ${bannerMap.get(role)} text-center`}>
        {role}
      </div>
    );
  }
};

export default Banner;
