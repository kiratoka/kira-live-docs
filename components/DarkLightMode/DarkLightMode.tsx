
const DarkLightMode = ({ toggleButton, isDark }: { toggleButton: () => void; isDark: boolean }) => {

    return (
        <button onClick={toggleButton}>
            <div>
                {isDark ?
                    <h1 className="text-white">
                        Light Mode
                    </h1>
                    :
                    <h1 className="text-black">
                        Dark Mode
                    </h1>
                }
            </div>
        </button>
    )
}

export default DarkLightMode