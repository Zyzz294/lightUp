import React, { useEffect, useState } from 'react'
import './HomePage.sass'
import MySlider from '../../MySlider/MySlider'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, reset } from '../../../redux/user/userSlice'
import { getAllArticles } from '../../../redux/article/articleSlice'
import { getAllLifehacks } from '../../../redux/lifehack/lifehackSlice'

const Homepage = ({ setIsMain }) => {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const id = user && user.id

  useEffect(() => {
    setIsMain(true)
    if (id) {
      dispatch(getUserById(id))
      dispatch(reset())
    }
  })

  useEffect(() => {
    dispatch(getAllArticles({ page }))
    dispatch(getAllLifehacks({ page }))
  }, [])

  const { allArticles } = useSelector((state) => state.article)
  const { allLifehacks } = useSelector((state) => state.lifehack)
  const lifehack = allLifehacks[0]
  const threeArticles = allArticles.slice(0, 3)

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='hero__title-wrapper'>
            <h1 className='hero__title'>
              We are glad to every guest visiting Kyrgyzstan
            </h1>
          </div>
        </div>
      </section>

      <section className='about'>
        <div className='container'>
          <div className='about__wrapper'>
            <div className='about__img'>
              <img
                src='./assets/img/about-img.png'
                alt=''
                className='about__img-item'
              />
            </div>

            <div className='about__content'>
              <h2 className='about__title'>About Us</h2>
              <p className='about__descr'>
                We are the Light Up Travel team strive to show our dear guests
                the most beautiful places of the Kyrgyz ancient nomadic people,
                as tourists in our country we will take care and accompany you
                on every journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='reason'>
        <div className='container'>
          <h2 className='reason__title'>Reasons to travel in Kyrgyzstan</h2>
          <div className='reason__cards-wrapper'>
            <div className='reason__card-first-col'>
              <div className='reason-card'>
                <div className='reason-card__icon'>
                  <img src='./assets/icons/forest.png' alt='' />
                </div>
                <div className='reason-card__content'>
                  <h3 className='reason-card__title'>Untouched nature</h3>
                  <p className='reason-card__descr'>
                    90 percent of Kyrgyzstan's territory is covered by
                    mountains. Amazing views of the region.
                  </p>
                </div>
              </div>

              <div className='reason-card'>
                <div className='reason-card__icon'>
                  <img src='./assets/icons/moutain.png' alt='' />
                </div>
                <div className='reason-card__content'>
                  <h3 className='reason-card__title'>Rich Cultural Heritage</h3>
                  <p className='reason-card__descr'>
                    Visiting sunny Kyrgyzstan, you will learn a lot about oral
                    folk art, games and about skillful needlework
                  </p>
                </div>
              </div>
            </div>

            <div className='reason__card-second-col'>
              <div className='reason-card'>
                <div className='reason-card__icon'>
                  <img src='./assets/icons/food.png' alt='' />
                </div>
                <div className='reason-card__content'>
                  <h3 className='reason-card__title'>National cuisine</h3>
                  <p className='reason-card__descr'>
                    The richest and most delicious cuisine in Central Asia, you
                    will always be full and satisfied
                  </p>
                </div>
              </div>

              <div className='reason-card'>
                <div className='reason-card__icon'>
                  <img src='./assets/icons/visa.png' alt='' />
                </div>
                <div className='reason-card__content'>
                  <h3 className='reason-card__title'>Visa-free regime</h3>
                  <p className='reason-card__descr'>
                    Kyrgyzstan has a visa-free regime for citizens of more than
                    40 countries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='place'>
        <div className='container'>
          <div className='place__top-wrapper'>
            <div className='place__content'>
              <h2 className='place__title'>Places</h2>
              <p className='place__descr'>
                We are happy to present for our dear guests the most attractive
                and beautifule places.This places are famous for his mountains,
                frash air, lakes and woods
              </p>
            </div>

            {/* <div className='place__regions'>
              <span>Naryn</span>
              <span>Chuy</span>
              <span>Issyk-Kul</span>
              <span>Osh</span>
            </div> */}
          </div>

          <div className='place__card-wrapper'>
            {/* <div className='place-card'>
              <img
                src='./assets/ImageTemplates/slider-1.png'
                alt=''
                className='place-card__img'
              />
              <h4 className='place-card__title'>Kel - Suu lake</h4>
            </div>

            <div className='place-card'>
              <img
                src='./assets/ImageTemplates/slider-2.png'
                alt=''
                className='place-card__img'
              />
              <h4 className='place-card__title'>Burana</h4>
            </div>

            <div className='place-card'>
              <img
                src='./assets/ImageTemplates/slider-3.png'
                alt=''
                className='place-card__img'
              />
              <h4 className='place-card__title'>Arslanbob</h4>
            </div> */}
            <MySlider>
              <img
                className='image'
                src='./assets/ImageTemplates/slider-1.png'
                alt=''
              />
              <img
                className='image'
                src='./assets/ImageTemplates/slider-2.png'
                alt=''
              />
              <img
                className='image'
                src='./assets/ImageTemplates/slider-3.png'
                alt=''
              />
            </MySlider>
          </div>

          <div className='place__btn-wrapper'>
            <button className='place__btn'>
              <Link to={'/places'}>Start Explore</Link>
            </button>
          </div>
        </div>
      </section>

      <section className='article'>
        <div className='container'>
          <h2 className='article__title'>Articles</h2>

          <div className='article__card-wrapper'>
            {threeArticles &&
              threeArticles.map((article) => (
                <div className='article-card' key={article.id}>
                  <div className='article-card__img-wrapper'>
                    <img
                      // src='./assets/ImageTemplates/article-1.png'
                      src={article.filePath}
                      alt='not-found'
                      className='article-card__img'
                    />
                  </div>
                  <h4 className='article-card__title'>{article.title}</h4>
                  <small className='article-card__data'>
                    {article.dateCreated}
                  </small>
                </div>
              ))}
          </div>

          <div className='article__btn-wrapper'>
            <button className='article__btn'>
              <Link to={'/articles'}>Read More</Link>
            </button>
          </div>
        </div>
      </section>

      <section className='lifehack'>
        <div className='container'>
          <div className='lifehack__wrapper'>
            <div className='lifehack__content'>
              <h2 className='lifehack__title'>Life Hacks</h2>
              <h3 className='lifehack__subtitle'>
                {lifehack && lifehack.title}
              </h3>
              <p className='lifehack__descr'>
                {lifehack && lifehack.description}
              </p>
              <Link to={'/lifehacks'}>
                <button className='lifehack__btn'>Watch more</button>
              </Link>
            </div>

            <div className='lifehack__video'>
              <Link to={'/lifehacks'} className='lifehack__link'>
                <img src='./assets/icons/play.png' alt='' />
              </Link>

              <div className='lifehack__img'>
                <video src={lifehack && lifehack.filePath} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Homepage
