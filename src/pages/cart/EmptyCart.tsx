import Lottie from 'lottie-react'
import EmptyCartGirlLottie from '../../assets/Lottie/emptyCartGirl.json'
import EmptyCartLottie from '../../assets/Lottie/emptyCart.json'

const EmptyCart = () => {
  return (
    <div className='flex items-center justify-center'>
        <Lottie animationData={EmptyCartGirlLottie} className='w-96'/>
        <Lottie animationData={EmptyCartLottie} className='w-96'/>
    </div>
  )
}

export default EmptyCart