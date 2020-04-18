import React from 'react'
import Layout from '@components/layout'
import '@styles/index_page.scss'

const App = () => {
  return (
    <Layout>
      <main>
        <div className="content">
          <div>
            <h3 className="top">11</h3>
          </div>

          <div>
            <h1 className="greeting">
              Hello, I'm{' '}
              <mark
                onMouseEnter={(e) => {
                  let main = document.querySelector('main')
                  main.classList.add('hovered')
                }}
                onMouseLeave={(e) => {
                  let main = document.querySelector('main')
                  main.classList.remove('hovered')
                }}
              >
                Frenco.
              </mark>
            </h1>
            <div className="hr-block" />

            <h2 className="description">
              I do software development as a hobby.
            </h2>
          </div>

          <div className="links">
            <a href="https://twitter.com/frencojobs">Twitter</a>
            <a href="https://github.com/frencojobs">GitHub</a>
            <a href="https://www.linkedin.com/in/frencojobs/">LinkedIn</a>
            <a href="https://blog.frenco.codes">Blog</a>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default App