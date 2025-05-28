import React from 'react'

const buttonVariants = {
    default: "bg-white text-black hover:bg-white/90",

}

const Button = ({className, variant, ...props}) => {
    return (
        <div className={`inline-flex items-center rounded-md border px-3 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${buttonVariants[variant]} ${className}`} {...props}/>

    )
}

export default Button