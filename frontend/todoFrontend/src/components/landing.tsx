import DavidVideo from '../assets/in-y2mate.com - METAMORPHOSIS  David goggins edit 4K_1080pFHR.mp4';
import davidPhoto from '../assets/davidPhoto.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TaskIcon from '@mui/icons-material/Task';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className='main' style={{ position: 'relative', overflow: 'hidden' }}>
        <video src={DavidVideo} loop muted autoPlay style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
        <div className="content" style={{
          position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', padding: '0 20px', boxSizing: 'border-box'
        }}>
          <div>
            <h1>Not just any NORMAL TODO app</h1>
            <br />
            <h2 >featuring David Goggins to motivate you!</h2>
            <br />
            <center>
              <Button onClick={() => { navigate('/signup') }} variant="contained">Sign up now</Button>
            </center>
          </div>
        </div>
      </div>

      <hr />

      <Box className='quote' sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-evenly', alignItems: 'center', padding: '5vh' }}>
        <div style={{  textAlign: 'center'}}>
          <i>Confidence comes from getting shit done</i>
          <br />
          <i>~David Goggins</i>
        </div>
        <Box component="div" sx={{ mt: { xs: '2vh', md: '0' }, textAlign: 'center' }}>
          <img src={davidPhoto} alt="David Goggins" style={{ height: '40vh', width: 'auto', maxWidth: '100%' }} />
        </Box>
      </Box>
      <hr />

      <center style={{ marginTop: '10px', marginBottom: '10px' }}><h1 style={{ fontSize: '3vw' }}>Features</h1></center>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <center><h3>Task management</h3></center>
              </Typography>
              <center>
                <TaskIcon color='primary' sx={{ height: '15vh', width: '15vh' }} />
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <center><h3>Score board</h3></center>
              </Typography>
              <center>
                <ScoreboardIcon color='primary' sx={{ height: '15vh', width: '15vh' }} />
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <center><h3>David Goggins theme</h3></center>
              </Typography>
              <center>
                <FitnessCenter color='primary' sx={{ height: '15vh', width: '15vh' }} />
              </center>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <hr />
      <Box sx={{ padding: '3vh' }}>
        <center><h1 style={{ fontSize: '3vw' }}>Pricing</h1></center>
        <br />
        <center>
          <Card sx={{ minWidth: 275, height: '120px', width: '120px', margin: 'auto' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                <center>Absolutley Free!</center>
              </Typography>
            </CardContent>
            <center>
              <Button size="small" variant="contained" onClick={()=>{navigate('/signup')}}>Sign up now!</Button>
            </center>
          </Card>
        </center>
      </Box>
    </>
  );
}

export default LandingPage;
