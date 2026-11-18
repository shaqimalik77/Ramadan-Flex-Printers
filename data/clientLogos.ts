/**
 * Client logos sent by the client (18 Nov 2026) for the redesign.
 * Files are trimmed and resized copies in /assets/clients, imported (not
 * served from /public, which doesn't pick up new files on Hostinger).
 *
 * The old homepage still uses data/clientsdata.ts.
 */
import type { StaticImageData } from "next/image";
import acadevis from "@/assets/clients/acadevis.png";
import herbion from "@/assets/clients/herbion-naturals.png";
import lahoriNawab from "@/assets/clients/lahori-nawab.png";
import synergy from "@/assets/clients/synergy-services.png";
import painRehab from "@/assets/clients/pain-rehab.png";
import ostric from "@/assets/clients/ostric.png";
import punjabColleges from "@/assets/clients/punjab-colleges.png";
import vitaSteps from "@/assets/clients/vita-steps.png";
import bioderm from "@/assets/clients/bioderm-derma.png";
import pizzaMax from "@/assets/clients/pizza-max.png";
import pizzaOnline from "@/assets/clients/pizza-online.png";

export interface ClientLogo {
  name: string;
  logo: StaticImageData;
}

export const clientLogos: ClientLogo[] = [
  { name: "Pizza Max", logo: pizzaMax },
  { name: "Punjab Colleges", logo: punjabColleges },
  { name: "Herbion Naturals", logo: herbion },
  { name: "Lahori Restaurant & Nawab Dairy Ice Cream", logo: lahoriNawab },
  { name: "Acadevis", logo: acadevis },
  { name: "Pizza Online", logo: pizzaOnline },
  { name: "Ostric", logo: ostric },
  { name: "Bioderm Derma", logo: bioderm },
  { name: "PainRehab", logo: painRehab },
  { name: "Vita Steps", logo: vitaSteps },
  { name: "Synergy Services", logo: synergy },
];
