// transitions.js — Scroll-reveal & page entrance animations

/**
 * Initialize IntersectionObserver-based scroll reveal.
 * Elements with [data-reveal] or [data-reveal-group] will animate
 * in when they enter the viewport. Fires ONCE per element.
 */
export function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal], [data-reveal-group]')
  if (!els.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // fire only once
      }
    })
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  })

  els.forEach(el => observer.observe(el))
}

/**
 * Animate elements already in viewport on load (above the fold).
 */
export function revealAboveFold() {
  const els = document.querySelectorAll('[data-reveal], [data-reveal-group]')
  const vp = window.innerHeight

  els.forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < vp - 60) {
      el.classList.add('visible')
    }
  })
}

/**
 * Number counter animation for stat sections.
 * Usage: <span data-count="10000" data-suffix="+">0</span>
 */
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]')
  if (!counters.length) return

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = +el.dataset.count
      const suffix = el.dataset.suffix || ''
      const prefix = el.dataset.prefix || ''
      const duration = 2000
      const start = performance.now()

      function update(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out
        const eased = 1 - Math.pow(1 - progress, 3)
        const value = Math.floor(eased * target)
        el.textContent = prefix + value.toLocaleString() + suffix
        if (progress < 1) requestAnimationFrame(update)
      }

      requestAnimationFrame(update)
      obs.unobserve(el)
    })
  }, { threshold: 0.5 })

  counters.forEach(el => obs.observe(el))
}

/**
 * Smooth active nav link highlighting based on scroll position.
 */
export function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]')
  const links = Array.from(document.querySelectorAll(
    'header nav a[href^="#"], nav[role="navigation"] a[href^="#"], aside a[href^="#"]'
  )).filter((link) => {
    const href = link.getAttribute('href') || ''
    return href.startsWith('#') && href !== '#main-content' && href !== '#' && document.querySelector(href)
  })
  if (!sections.length || !links.length) return

  const ratios = new Map()
  const sectionList = Array.from(sections)

  function setActive(activeId) {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`
      link.classList.toggle('active', isActive)
      if (isActive) {
        link.setAttribute('aria-current', 'location')
      } else {
        link.removeAttribute('aria-current')
      }

      if (link.closest('.chr-nav-links') && !link.classList.contains('db-nav-item')) {
        link.style.color = isActive ? 'var(--color-primary)' : ''
      }
    })
  }

  function pickFallbackSection() {
    const activationLine = window.innerHeight * 0.35
    let fallbackId = sectionList[0].id

    sectionList.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationLine) {
        fallbackId = section.id
      }
    })

    return fallbackId
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
    })

    let bestId = null
    let bestRatio = 0

    sectionList.forEach((section) => {
      const ratio = ratios.get(section.id) || 0
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = section.id
      }
    })

    setActive(bestId || pickFallbackSection())
  }, {
    threshold: [0, 0.15, 0.35, 0.55, 0.75],
    rootMargin: '-15% 0px -35% 0px',
  })

  sectionList.forEach((section) => {
    ratios.set(section.id, 0)
    obs.observe(section)
  })

  setActive(pickFallbackSection())
}

function getCurrentSectionIndex(sectionList) {
  const activationLine = window.innerHeight * 0.35
  let index = 0

  sectionList.forEach((section, sectionIndex) => {
    if (section.getBoundingClientRect().top <= activationLine) {
      index = sectionIndex
    }
  })

  return index
}

function getSectionMotionProfile() {
  const path = window.location.pathname.toLowerCase()

  if (path.includes('layout-04') || path.includes('layout-08') || path.includes('layout-12')) return 'soft'
  if (path.includes('layout-05') || path.includes('layout-15')) return 'lateral'
  if (path.includes('layout-09')) return 'cyber'
  if (path.includes('layout-14')) return 'travel'
  if (path.includes('layout-02') || path.includes('layout-06')) return 'creative'
  if (path.includes('layout-03') || path.includes('layout-10')) return 'editorial'
  if (path.includes('layout-07')) return 'launch'
  if (path.includes('layout-16') || path.includes('layout-18')) return 'soft'
  if (path.includes('layout-17')) return 'cyber'
  if (path.includes('layout-19')) return 'launch'
  if (path.includes('layout-20')) return 'editorial'
  return 'default'
}

export function initSectionJumpTransitions() {
  const sectionList = Array.from(document.querySelectorAll('section[id]'))
  const links = Array.from(document.querySelectorAll('a[href^="#"]')).filter((link) => {
    const href = link.getAttribute('href') || ''
    return href.startsWith('#') && href !== '#' && href !== '#main-content' && document.querySelector(href)
  })
  if (!sectionList.length || !links.length) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.body.dataset.sectionMotion = getSectionMotionProfile()

  let activeCleanup = null

  function moveFocusToTarget(target) {
    const hadTabIndex = target.hasAttribute('tabindex')

    if (!hadTabIndex) {
      target.setAttribute('tabindex', '-1')
    }

    target.focus({ preventScroll: true })

    if (!hadTabIndex) {
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex')
      }, { once: true })
    }
  }

  function focusTargetWhenVisible(target) {
    if (reduceMotion) {
      window.requestAnimationFrame(() => moveFocusToTarget(target))
      return
    }

    const rect = target.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.12

    if (isVisible) {
      window.requestAnimationFrame(() => moveFocusToTarget(target))
      return
    }

    let observer = null
    let fallbackId = null

    const cleanup = () => {
      observer?.disconnect()
      observer = null
      if (fallbackId) {
        window.clearTimeout(fallbackId)
        fallbackId = null
      }
    }

    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        cleanup()
        window.requestAnimationFrame(() => moveFocusToTarget(target))
      }
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -18% 0px',
    })

    observer.observe(target)
    fallbackId = window.setTimeout(() => {
      cleanup()
      moveFocusToTarget(target)
    }, 900)
  }

  function triggerSectionJump(target, direction) {
    if (activeCleanup) activeCleanup()

    const classNames = ['chr-section-jump-target', `chr-section-jump-${direction}`]
    let observer = null
    let fallbackId = null

    const cleanup = () => {
      classNames.forEach((className) => target.classList.remove(className))
      observer?.disconnect()
      observer = null
      target.removeEventListener('animationend', cleanup)
      if (fallbackId) {
        window.clearTimeout(fallbackId)
        fallbackId = null
      }
      if (activeCleanup === cleanup) activeCleanup = null
    }

    const run = () => {
      cleanup()
      // Force a reflow so repeated jumps retrigger the animation.
      void target.offsetWidth
      classNames.forEach((className) => target.classList.add(className))
      target.addEventListener('animationend', cleanup, { once: true })
      fallbackId = window.setTimeout(cleanup, 900)
    }

    const rect = target.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.15

    if (alreadyVisible) {
      run()
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            observer?.disconnect()
            observer = null
          }
        })
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -18% 0px',
      })

      observer.observe(target)
    }

    activeCleanup = cleanup
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const href = link.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      const target = document.querySelector(href)
      if (!(target instanceof HTMLElement)) return

      event.preventDefault()

      const currentIndex = getCurrentSectionIndex(sectionList)
      const targetIndex = sectionList.findIndex((section) => section.id === target.id)
      const direction = targetIndex >= currentIndex ? 'forward' : 'backward'

      triggerSectionJump(target, direction)

      if (window.location.hash !== href) {
        history.pushState(null, '', href)
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      focusTargetWhenVisible(target)
    })
  })
}

/**
 * FAQ accordion with keyboard support.
 */
export function initFAQ() {
  const items = document.querySelectorAll('.chr-faq-trigger')

  items.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true'
      // Close all
      items.forEach(t => {
        t.setAttribute('aria-expanded', 'false')
        t.nextElementSibling?.classList.remove('open')
      })
      // Open current if was closed
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true')
        trigger.nextElementSibling?.classList.add('open')
      }
    })

    // Keyboard support
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        trigger.click()
      }
      if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false')
        trigger.nextElementSibling?.classList.remove('open')
      }
    })
  })
}

/**
 * Mobile nav toggle
 */
export function initMobileNav() {
  const toggles = Array.from(document.querySelectorAll('.chr-nav-toggle'))
  if (!toggles.length) return

  function setToggleVisualState(toggle, isOpen) {
    toggle.setAttribute('aria-expanded', isOpen.toString())
    toggle.querySelectorAll('span').forEach((span, index) => {
      if (isOpen) {
        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)'
        if (index === 1) span.style.opacity = '0'
        if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)'
      } else {
        span.style.transform = ''
        span.style.opacity = ''
      }
    })
  }

  function domDistance(a, b) {
    let distance = 0
    let current = a
    while (current && !current.contains(b)) {
      current = current.parentElement
      distance += 1
    }
    return distance
  }

  function findClosestNavLinks(toggle) {
    let scope = toggle.parentElement

    while (scope && scope !== document.body) {
      const matches = Array.from(scope.querySelectorAll('.chr-nav-links')).filter((candidate) => !candidate.contains(toggle))
      if (matches.length === 1) return matches[0]
      if (matches.length > 1) {
        return matches
          .sort((a, b) => domDistance(toggle, a) - domDistance(toggle, b))[0]
      }
      scope = scope.parentElement
    }

    return null
  }

  toggles.forEach((toggle) => {
    const links = findClosestNavLinks(toggle)
    if (!links) return

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open')
      setToggleVisualState(toggle, isOpen)
    })

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open')
        setToggleVisualState(toggle, false)
      })
    })
  })
}
