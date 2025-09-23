//components/UI/button.js
const variants = {
    default: "",
    primary: "bg-[var(--teal)] text-xl font-lightbold text-[var(--white)] relative rounded-full hover:cursor-pointer",
    secondary: "",
    danger: "",
};

export const Button = ({ children, variant, className, ...props }) => {
    return (
        <button
            className={`${className} ${variants[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
}