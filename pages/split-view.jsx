import {Fragment} from 'react';
import HomePagePhoto from '../components/ui_prototype/HomePagePhoto';
import NewsFeed from '../components/ui_prototype/NewsFeed';

const SplitView = () => {
    return(
        <Fragment>
            <section>
                <div className='w-screen h-screen grid grid-rows-2 md:grid-cols-2'>
                    <div className='flex w-full h-full md:h-screen justify-center items-center'>
                        <HomePagePhoto/>  
                    </div>
                    <div className='flex w-full h-full text-white md:h-screen items-center'>
                        <NewsFeed/>
                    </div>
                </div>

            </section>

        </Fragment>
    );
}

export default SplitView;