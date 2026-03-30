import { useState, useEffect } from 'react';
import CategoryGroup from './CategoryGroup'
import InfoCard from './InfoCard'
import TagGroups from './TagGroups'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'

/**
 * 侧边栏
 * @param tags
 * @param currentTag
 * @param post
 * @param posts
 * @param categories
 * @param currentCategory
 * @returns {JSX.Element}
 * @constructor
 */
const SideBar = (props) => {
  const { tags, currentTag, post, slot, categories, currentCategory } = props
  const { locale } = useGlobal()
  return (
    <aside id='sidebar' className='bg-white dark:bg-gray-900 w-80 z-10 dark:border-gray-500 border-gray-200 scroll-hidden h-full'>

      <div className={(!post ? 'sticky top-0' : '') + ' bg-white dark:bg-gray-900 pb-4'}>

        <section className='py-5'>
          <InfoCard {...props} />
        </section>

        {/* 3. 🎯 倒计时组件 - 添加在这里 */}
        <Countdown />

        {/* 分类  */}
        {categories && (
          <section className='mt-8'>
            <div className='text-sm px-5 flex flex-nowrap justify-between font-light'>
              <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-th-list' />{locale.COMMON.CATEGORY}</div>
              <SmartLink
                href={'/category'}
                passHref
                className='mb-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>

                {locale.COMMON.MORE} <i className='fas fa-angle-double-right'/>

              </SmartLink>
            </div>
            <CategoryGroup currentCategory={currentCategory} categories={categories} />
          </section>
        )}

        {/* 标签云  */}
        {tags && (
          <section className='mt-4'>
            <div className='text-sm py-2 px-5 flex flex-nowrap justify-between font-light dark:text-gray-200'>
              <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-tag'/>{locale.COMMON.TAGS}</div>
              <SmartLink
                href={'/tag'}
                passHref
                className='text-gray-500 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>

                {locale.COMMON.MORE} <i className='fas fa-angle-double-right'/>

              </SmartLink>
            </div>
            <div className='px-5 py-2'>
              <TagGroups tags={tags} currentTag={currentTag} />
            </div>
          </section>
        )}

        {slot}

      </div>

    </aside>
  )
}

// 在文件末尾（export default 之前）添加倒计时组件
const Countdown = () => {
  console.log('倒计时组件已加载');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 计算目标日期（当年12月31日 23:59:59）
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    
    const timer = setInterval(() => {
      const currentTime = new Date();
      const difference = targetDate - currentTime;
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-widget mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-base font-semibold text-center mb-3 text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2">
        <span>🎉</span>
        <span>距离年底还有</span>
        <span>🎊</span>
      </h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="countdown-unit">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {timeLeft.days}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">天</div>
        </div>
        <div className="countdown-unit">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {timeLeft.hours}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">时</div>
        </div>
        <div className="countdown-unit">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {timeLeft.minutes}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">分</div>
        </div>
        <div className="countdown-unit">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {timeLeft.seconds}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">秒</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar
