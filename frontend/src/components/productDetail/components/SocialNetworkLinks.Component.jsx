const SocialNetworkLinksComponent = ({networkName})=>{

    let networkNameLowerCase = networkName.toLowerCase();

    return(
        <a
        href={`https://www.${networkNameLowerCase}.com`}
        title={networkName}
        target='_blank'
        rel='noreferrer'>
        {networkName}
        </a>
    )
}

export default SocialNetworkLinksComponent;