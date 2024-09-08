"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Discover() {
    const translate = useTranslations("labels")
    return (
        <div className="container flex items-center mt-20 mb-10 flex-col">
            <h1 className="text-3xl mb-4">{translate("discover")}</h1>
            <p>{translate("discoverText")}</p>
            <Link 
                href="/products"
                className="underline my-5"
            >
                {translate("viewProducts")}
            </Link>
        </div>
    )
}