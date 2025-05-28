import React from 'react'

const badgeVariants = {
    default: "border-transparent bg-gray-50/50 text-white hover:bg-gray-50/60",

}

const Badge = ({className, variant, ...props}) => {
    return (
        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${badgeVariants[variant]} ${className}`} {...props}/>

    )
}

export default Badge