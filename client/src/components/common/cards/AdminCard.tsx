
import type { ReactNode } from "react";

const AdminCard = ({card} : {card : {icon : ReactNode, title : string , value : string}}) => {
  return (
    <div className="bg-white rounded-lg border border-[#C5C6CD] p-6 flex flex-col items-start gap-2">
      {card.icon}
      <h3 className="uppercase font-[Inter] font-medium text-[12px] text-[#515F74]">
        {card.title}
      </h3>
      <h2 className="font-[Inter] font-semibold text-[24px] text-[#091426]">
        {card.value}
      </h2>
    </div>
  );
};

export default AdminCard;
