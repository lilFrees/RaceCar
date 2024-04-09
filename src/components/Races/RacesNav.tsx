import style from './RacesNav.module.scss'
import { CiPlay1 } from 'react-icons/ci'
import { GrPowerReset } from 'react-icons/gr'
import useCars from '../../hooks/useCars'
import { useEffect, useState } from 'react'
import { CarNavType } from '../../types/interfaces'

function RacesNav() {
  const { state, createCar, updateCar, create100Cars } = useCars()

  const [updatingValue, setUpdatingValue] = useState<CarNavType>({
    name: '',
    color: '#000000',
  })

  function nameUpdatingHandler(value: string) {
    if (state.carIsSelected) {
      setUpdatingValue({ ...updatingValue, name: value })
    }
  }

  function colorUpdatingHandler(value: string) {
    if (state.carIsSelected) {
      setUpdatingValue({ ...updatingValue, color: value })
    }
  }

  const [creatingValue, setCreatingValue] = useState<CarNavType>({
    name: '',
    color: '#000000',
  })

  function nameCreatingValue(value: string) {
    setCreatingValue({ ...creatingValue, name: value })
  }

  function colorCreatingValue(value: string) {
    setCreatingValue({ ...creatingValue, color: value })
  }

  useEffect(() => {
    if (state.carIsSelected) {
      setUpdatingValue({
        name: state.selectedCar!.name,
        color: state.selectedCar!.color,
      })
    } else {
      setUpdatingValue({
        name: '',
        color: '#000000',
      })
    }
  }, [state.selectedCar])

  return (
    <div className={style.nav}>
      <div className={style.nav__item}>
        <button className={style.btn}>
          Race <CiPlay1 />
        </button>
        <button className={style.btn}>
          Reset <GrPowerReset />
        </button>
      </div>
      <div className={style.nav__item}>
        <input
          type="text"
          max={20}
          className={style.input}
          placeholder="TYPE CAR BRAND"
          value={creatingValue.name}
          onChange={(val) => {
            nameCreatingValue(val.target.value)
          }}
        />
        <input
          type="color"
          className={style.color}
          value={creatingValue.color}
          onChange={(val) => {
            colorCreatingValue(val.target.value)
          }}
        />
        <button
          className={style.btn}
          onClick={() => {
            createCar(creatingValue.name, creatingValue.color)
            setCreatingValue({
              name: '',
              color: '#000000',
            })
          }}
        >
          Create
        </button>
      </div>
      <div className={style.nav__item}>
        <input
          type="text"
          max={20}
          className={style.input}
          placeholder="TYPE CAR BRAND"
          value={updatingValue.name}
          onChange={(val) => {
            nameUpdatingHandler(val.target.value)
          }}
        />
        <input
          type="color"
          className={style.color}
          value={updatingValue.color}
          onChange={(val) => {
            colorUpdatingHandler(val.target.value)
          }}
        />
        <button
          className={style.btn}
          onClick={() => {
            updateCar(
              state.selectedCar!.id,
              updatingValue.name,
              updatingValue.color
            )
          }}
        >
          Update
        </button>
      </div>
      <div className={style.nav__item}>
        <button className={style.btn} onClick={create100Cars}>
          Generate Cars
        </button>
      </div>
    </div>
  )
}

export default RacesNav
