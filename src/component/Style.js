

export const styles = {
  

  logoDiv: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    margin: '12px',
  },
  logoPng: {
    width: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
  },

  btn: {
    letterSpacing: "1px",

    fontSize: '14px',
    borderRadius: '8px',
    paddingLeft: '7px',
    paddingRight: '7px',
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: "rgb(31, 56, 48)",
    width: 'auto',
    fontWeight: 'normal',
  },
  mainHeading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Horizontally center content
    justifyContent: 'center', // Vertically center content (if needed)
    width: '100%', // Take full width of its parent
    textAlign: 'center', // Center text within the h1 and h3
    marginTop: '160px', // Add some top margin for spacing (adjust as needed)
  },
  h1Style: {
    fontSize: '60px',
    fontWeight: '600', // Semibold
    color: '#333', // Dark Gray
    marginBottom: '60px',
    fontFamily: 'sans-serif'
  },
  h3Style: {
    fontSize: '26px',
    color: '#333', // Dark Gray
    fontFamily: 'sans-serif'
  },
  h3StyleAcademy:{
    fontSize: '26px',
    color: '#333', // Dark Gray
    fontFamily: 'sans-serif',
    marginBottom: '200px',


  },
  hubSpan: {
    color: '#0056b3', // Darker Blue
  },
  heading: {
    // color: 'grey',
    fontSize: "1.2rem",
    fontWeight: "bold",
    // textTransform: "uppercase",
    letterSpacing: "2px",
    textAlign:'center',
    margin:"12px",
  },
  quickSearch: {
    background: '#007BFF',
    color: 'white',
    fontWeight: 'bold',
  },
  btnLogout: {
    backgroundColor: "rgb(0, 59, 137)",
    padding: '0px 0px',
    margin: '0px',
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s ease",
  },
  navLinkHover: {
    color: "#d1d5db", // Light Gray
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
  },
  btnSignup: {
    background: "white",
    marginLeft: "8px",
    color: "#2563eb", // Blue Text
    padding: "8px 10px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnSignupHover: {
    background: "#f3f4f6", // Light Gray Background
  },
  btnLogin: {
    background: "black",
    // marginTop: "8px",
    color: "white",
    padding: "8px 16px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnLoginHover: {
    background: "#1f2937", // Dark Gray Background
  },
  playersContainerStyle: {
    width: '80%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  playerBoxStyle: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    width: "270px",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.7)",
    textAlign: "center",
  },
  tableDiv: {
    width: "100%",

  },
  map:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    background:'white',
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    padding:'20px',
    height:'500px',

  },
  responsiveMap:{
   position:'relative',
  }
};