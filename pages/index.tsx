import { ExperienceCard } from '@components/ExperienceCard'
import { ProjectCard } from '@components/ProjectCard'
import { Octokit } from '@octokit/rest'
import { GetStaticProps, NextPage } from 'next'

import data from '../data.json'

function isProject(v: Project | Array<Project>): v is Project {
  return !(v instanceof Array)
}

type Props = {
  stars: Array<{ owner: string; name: string; count: number }>
}

const IndexPage: NextPage<Props> = ({ stars }) => {
  return (
    <main className="w-full p-5 mx-auto font-sans md:max-w-4xl">
      <div className="h-5" />
      <header>
        <h1 className="text-3xl font-bold">Frenco</h1>
        <p className="text-lg font-medium text-gray-500">
          Software Engineer, Student at UIT
        </p>
      </header>
      <div className="h-10" />
      <section className="relative">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>

          {/* <h1 className="font-serif text-3xl">
            GitHub
            <img src="/arrow-dark.gif" className="transform -rotate-45 w-21" />
          </h1> */}
        </div>
        <div className="h-5" />

        <div className="absolute top-0 left-0 flex-col items-center hidden mt-20 transform -rotate-45 -ml-60 lg:flex">
          <h1 className="mb-5 font-serif text-3xl">
            is on{' '}
            <a className="text-red-600 border-b-2 border-dashed">
              Product Hunt
            </a>{' '}
            now!
          </h1>
          <img
            src="/arrow-dark.gif"
            className="w-20 h-20 transform rotate-45"
          />
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(data.projects as Array<Project | Array<Project>>).map((x, idx) =>
            isProject(x) ? (
              <ProjectCard
                key={idx}
                item={x}
                star={
                  stars.find(
                    (s) => s.owner === x.repo.owner && s.name === x.repo.name
                  )?.count
                }
              />
            ) : (
              <ul
                className="flex flex-col items-stretch justify-between gap-4"
                key={idx}>
                {x.map((y, idy) => (
                  <ProjectCard
                    key={idy}
                    item={y}
                    useFlex
                    star={
                      stars.find(
                        (s) =>
                          s.owner === y.repo.owner && s.name === y.repo.name
                      )?.count
                    }
                  />
                ))}
              </ul>
            )
          )}
        </ul>
      </section>
      <div className="h-10" />
      <section>
        <h1 className="text-2xl font-bold">Work Experience &amp; Education</h1>
        <div className="h-5" />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(data.experiences as Array<Experience>).map((x, id) => (
            <ExperienceCard key={id} item={x} />
          ))}
        </ul>
      </section>
      <div className="h-10" />
      <section>
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="h-5" />
        <span className="text-lg">
          You can always drop me a quick mail to{' '}
          <span className="font-bold text-blue-800 underline">
            hey@frenco.dev
          </span>{' '}
          if you&apos;re interested in working with me. Also check out my other
          social media presences.
        </span>

        <div className="h-10" />

        <ul className="flex flex-row flex-wrap items-center justify-between max-w-xl">
          {data.links.map((link, id) => (
            <li key={id}>
              <a
                href={link.url}
                rel="noreferrer"
                target="_blank"
                className="font-bold text-blue-600 underline">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <div className="h-5" />
    </main>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const octokit = new Octokit()
  const projects = data.projects
  const stars = []

  for (const project of projects.flat()) {
    const res = await octokit.repos.get({
      owner: project.repo.owner,
      repo: project.repo.name,
    })

    const count = res.data.stargazers_count
    stars.push({ owner: project.repo.owner, name: project.repo.name, count })
  }

  return {
    props: {
      stars,
    },
  }
}

export default IndexPage
