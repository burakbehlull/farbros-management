import { Container } from "@chakra-ui/react"
import Routes from "../routes/index"
import Helmet from 'react-helmet';

function Layout() {

  
  return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#ec2828ff" />
                <meta name="description" content="Discord bot management panel" />
                <meta name="keywords" content="discord, bot, management, panel" />
                <meta name="robots" content="index, follow" />
                <title>Farbros Management</title>
            </Helmet>
            
            
            <Routes />
            
        </>
    )
}

export default Layout;