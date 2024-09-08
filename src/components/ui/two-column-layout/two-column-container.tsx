"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TwoColumnLayoutProps } from './two-column-layout.types';

export default function TwoColumnContainer({ id, title, imgUrl, text, isEven }: TwoColumnLayoutProps) {
    return (
        <div key={`homepage-product-${id}`} className={`flex flex-col items-center justify-center mb-10 gap-5 ${isEven ? 'flex-row-reverse md:flex-row-reverse' : 'flex-row md:flex-row'}`}>
            <motion.div
                className={`w-full md:w-1/2 flex ${isEven ? 'justify-end' : 'justify-start' }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Image
                    src={imgUrl}
                    alt="Product Image"
                    className="rounded-lg shadow-md size-96"
                    width={500}
                    height={500}
                />
            </motion.div>
            <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <h1 className='text-4xl mb-3'>{title}</h1>
                <p className="font-thin">{text}</p>
            </motion.div>
        </div>
    )
}