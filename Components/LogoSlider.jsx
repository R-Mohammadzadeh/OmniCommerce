import Image from "next/image";



const logos = [
    {name:"React" , src:'/photo/react.png'},
    {name:"javascript" , src:'/photo/javascript.png'},
    {name:"mongodb" , src:'/photo/mongodb.png'},
    {name:"next-js" , src:'/photo/next-js.png'},
    {name:"node-js" , src:'/photo/node-js.png'},
    {name:"stripe" , src:'/photo/stripe.png'},
    {name:"tailwind" , src:'/photo/tailwind.png'},
    {name:"github" , src:'/photo/github.png'},
];


const LogoSlider = () => {
const duplicatedLogos = [...logos,...logos,...logos];


return (
    <div className="overflow-hidden bg-slate-50 dark:bg-blue-900 py-4">
        <div className="flex gap-14 item-center animate-scroll">
            {duplicatedLogos.map((logo,index) => (
                <div className="group shrink-0 h-9 w-24 flex item-center justify-center" key={index}>
                    <Image src={logo.src} alt={logo.name} width={96} height={36}
                    className="max-h-full opacity-50 hover:opacity-100 max-w-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0"  />    
                </div>
            ))}
        </div>
    </div>
)

}

export default LogoSlider