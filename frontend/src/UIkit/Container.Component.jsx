

const ContainerComponent = ({isFluid, children}) => {
    return (
        <div className={`container${isFluid ? '-fluid' : ''}`}>
            <div className="row">
                {children}
            </div>
        </div>
    )
}

export default ContainerComponent