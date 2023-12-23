import HomeRecipes from '../../components/HomeRecipes';
import './index.scss';

const Home = () => {
     

    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    <h1>Find the perfect<br /> recipe for you.</h1>

                    <form>
                        <input type='text' placeholder='Search using ingredients or time'/>
                    </form>
                    
                </div>
            </div>
            <HomeRecipes />
        </>
        
    )
}

export default Home;