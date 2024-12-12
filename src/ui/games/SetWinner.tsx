"use client"
//BUENO ESTO NO FUNCIONÓ
// import { PlayerField, Player } from '@/app/lib/definitions';
// import {
//     UserCircleIcon,
// } from '@heroicons/react/24/outline';

// let p1 : string;

// const setp1 = (p : any) => {
//  p1 = p;
// }

// const getp1 = () => {
//   return p1;
// }

// export function SetWinner(players : PlayerField[]
    
// ) {
//     return (
//         <div className="relative">
//                 <select
//                   id="player1id"
//                   name="player1id"
//                   className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                   defaultValue=""
//                   onChange={(option) => {
//                     setp1(option.target.value);
//                   }}
//                 >
//                   <option value="" disabled>
//                     Select a player
//                   </option>
//                   {players.map((player) => (
//                     <option key={player.id} value={player.id}>
//                       {player.nick}
//                     </option>
//                   ))}
//                 </select>
//                 <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//               </div>
//     )
// }

