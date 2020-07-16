/* eslint-disable */
import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.store = options.store
    this.emitter = options.emitter
    this.prepare()
    this.unsubscribers = []
    this.storeSub = null
  }

  //Настраевает наш компонент до init
  prepare() {}

  //Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  $getState() {
    return this.store.getState()
  }

  //Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  //Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event,fn)
    this.unsubscribers.push(unsub)
  }

  //Инициализация компонента
  //Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }
  //Удаляем компонент
  //Чистим слушателей
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach((unsub => unsub()))
    this.storeSub.unsubscribe()
  }
}