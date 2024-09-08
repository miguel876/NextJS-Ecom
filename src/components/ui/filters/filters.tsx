import React from 'react'
import { Checkbox } from '../checkbox';

const Filters = () => {
  return (
    <div className='bg-muted h-full basis-1/4 rounded-sm p-2'>
        <div className='text-md'>Filters</div>
        <div>
            Stock
            <div>
                <Checkbox id="in-stock" />
                <label
                    htmlFor="in-stock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    In Stock
                </label>
                <Checkbox id="without-stock" />
                <label
                    htmlFor="without-stock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Without Stock
                </label>
            </div>
        </div>
        <div>
            Price
        </div>
        <div>
            Product State
            <div>
                New
                Promotion
            </div>
        </div>
    </div>
  )
}

export default Filters;