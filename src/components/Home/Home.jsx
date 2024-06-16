import Chart from '../Chart/Chart';
import Grid from '../Chart/Grid/Grid';
import './Home.css';
const Home = () => {
    return(
        <div class="container-fluid h-100 w-100">
            <div class="container h-100">
                <Chart />
                <Chart />
                <Chart />   
            </div>
        </div>
    )
};

export default Home;
