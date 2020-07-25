/* eslint-disable */
import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.store = options.store
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.prepare()
    this.unsubscribers = []
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



  $getState() {
    return this.store.getState()
  }

  //Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  //Сюда приходят только изменения по тем полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
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
  }
}
