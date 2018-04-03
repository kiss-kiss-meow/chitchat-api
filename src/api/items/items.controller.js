class ItemsController {
  constructor() {
    this.items = [
      {
        id: 1,
        name: 'Item 1',
      },
      {
        id: 2,
        name: 'Item 2',
      },
      {
        id: 3,
        name: 'Item 3',
      },
    ]
  }

  static create() {
    return new ItemsController()
  }

  get() {
    return this.items
  }
}

module.exports = ItemsController
