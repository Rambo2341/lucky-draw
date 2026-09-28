import Link from "next/link";
import { Shell } from "@/demos/velora/components/section";

export default function NotFound() {
  return (
    <Shell className="py-24 md:py-32">
      <p className="serial text-ink-3">VE-404</p>
      <h1 className="display mt-4 text-[3rem] sm:text-[4rem]">This card doesn&apos;t exist.</h1>
      <p className="mt-3 text-ink-2" lang="ar" dir="rtl">
        هذه البطاقة غير موجودة.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/demos/velora/en/properties" className="btn btn-ink">
          Back to residences
        </Link>
        <Link href="/demos/velora/ar/properties" className="btn btn-line" lang="ar">
          العودة للعقارات
        </Link>
      </div>
    </Shell>
  );
}
