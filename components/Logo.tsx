import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/logo/logo.png"
      alt="Ramdan Flex Printers"
      width={80}
      height={40}
      preload
      className="h-auto w-auto"
    />
  );
}