import { vi } from 'vitest'

// Mock Vue's onMounted
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn((fn) => fn()),
    ref: vi.fn((value) => ({ value }))
  }
})

// Mock setTimeout for testing
global.setTimeout = vi.fn((fn, delay) => {
  // Immediately call the function for testing purposes
  fn()
  return 1
}) as any

// Mock document methods for testing
Object.defineProperty(window, 'document', {
  value: {
    createElement: vi.fn((tag) => ({
      tagName: tag.toUpperCase(),
      className: '',
      style: {},
      appendChild: vi.fn(),
      remove: vi.fn(),
      innerHTML: ''
    })),
    createTextNode: vi.fn((text) => ({
      textContent: text,
      data: text
    }))
  },
  writable: true
})