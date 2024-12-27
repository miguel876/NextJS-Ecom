import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getProductById } from '@/lib/db';
import { Check, Ship, X } from 'lucide-react';
import Image from 'next/image';
import { ProductDetailCta } from './product-detail-cta';

export const ProductDetails = async ({ id }: { id: string }) => {
  const product = await getProductById(parseInt(id, 10));

  if (!product) return;

  const hasStock = product?.stock > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-3/5">
          <Image
            src={product.imageUrl}
            alt="Procut Detail Image"
            width={700}
            height={500}
            className="rounded-lg"
            priority
          />
        </div>
        <div className="bg-secondary w-full md:w-2/5 rounded-lg p-3 flex flex-col gap-3">
          <h1 className="text-2xl">{product.name}</h1>
          <h2 className="text-3xl font-bold">{product.price} €</h2>
          <p className="flex gap-2 items-center text-sm">
            <Ship size={17} /> Free Delivery only for Portugal
          </p>
          <p
            className={`text-sm flex gap-2 items-center ${
              hasStock ? 'text-success' : 'text-destructive'
            }`}
          >
            {hasStock ? <Check size={17} /> : <X size={17} />}
            {hasStock ? 'In Stock' : 'Out of Stock'}
          </p>
          <div className="flex items-center gap-2">
            <Label>Quantity:</Label>
            <Input
              type="number"
              defaultValue="1"
              className="text-sm h-8 w-16"
            />
          </div>
          {hasStock && <ProductDetailCta />}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Financing</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                sed viverra enim, dignissim lacinia est.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where to find it?</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                sed viverra enim, dignissim lacinia est.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="bg-secondary rounded-lg p-3 pb-5 flex flex-col gap-3 ">
        <h1 className="text-2xl">Product Details and Technical Information</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          viverra enim, dignissim lacinia est. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Cras sed viverra enim, dignissim lacinia
          est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          viverra enim, dignissim lacinia est.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          viverra enim, dignissim lacinia est. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Cras sed viverra enim, dignissim lacinia
          est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          viverra enim, dignissim lacinia est.
        </p>
      </div>
    </div>
  );
};
