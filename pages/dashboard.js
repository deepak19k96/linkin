import { useEffect, useState } from "react";
import Head from "next/head";

import { getPageDatawLinkAndSocialData } from "../lib/dbfuncprisma";
import { cookieValidate, getLoggedInUser } from "../middleware/middleware";
import Home from "../components/linktree";
import Formwrapper from "../components/formwrapper";
import { useStateValue } from "../components/context/state";

export async function getServerSideProps({ req, res }) {
  try {
    let valid = cookieValidate(req, res);
    let data;
    if (valid) {
      let user = getLoggedInUser(req, res);
      data = await getPageDatawLinkAndSocialData(user.username);
    }
    return {
      props: {
        pageDataSS: data.pageData,
        linkDataSS: data.linkData,
        socialDataSS: data.socialData,
      },
    };
  } catch (error) {
    // console.log(error);
    return { props: { error: error.message } };
  }
}

const Admin = ({ pageDataSS, linkDataSS, socialDataSS }) => {
  const [pageData, setpageData] = useState(pageDataSS);

  const [{ links, socialLinks }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "updateLink",
      linkdata: linkDataSS,
    });

    dispatch({
      type: "updateSocial",
      socialdata: socialDataSS,
    });
  }, []);
  // console.log(links);

  // console.log(pageDataSS);

  const updatedPageData = (data) => {
    setpageData(data);
  };

  return (
    <>
      <Head>
        {" "}
        <title> {`Luxury Dashboard`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:description" content={`Luxury Dashboard`} />
        <meta name="og:site_name" content="Luxury" />
        <meta name="og:title" content={`Luxury Dashboard`} />
      </Head>
      <div className="d-flex dashboardwrapepr">
        <Formwrapper pageData={pageData} updatedPageData={updatedPageData} />
        <div className="preview">
          <Home
            {...pageData}
            linkData={links.filter((ele) => ele.displayText && ele.active)}
            socialData={socialLinks.filter((ele) => ele.linkUrl && ele.active)}
            preview
          />
        </div>
      </div>
      <style jsx>{`
        .preview {
          width: 40vw;
        }

        @media (max-width: 768px) {
          .dashboardwrapepr {
            flex-direction: column;
          }
          .preview {
            width: 100vw;
          }
        }
      `}</style>
    </>
  );
};
export default Admin;
