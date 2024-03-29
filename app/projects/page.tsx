"use client"

import Card from "@geist-ui/react/esm/card";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h2 className="font-medium text-2xl mb-8 tracking-tighter">Click on a project to see more</h2>
      <div className='flex flex-wrap px-4 py-4'>
        {workCard('planmi', './planmi.png', 'Design and generate communicative language lessons', 'https://planmi.vercel.app')}
        {workCard('grifgraf', './grifgraf-full.png', 'Create virtual graffiti on real-life spaces using your iPhone camera', 'https://grifgraf.app')}
        {workCard('accountabl', './accountabl.png', 'Budget with a friend, easily track eachothers spending and goals', 'https://github.com/ageofadz/accountabl')}
        {workCard('VRCausality', './unity.jpg', 'VR environment for causal judgement experiment', 'https://github.com/ageofadz/VRCausality')}
        </div>
    </section>
  );
}

function workCard(name: string, image: string, description: string, link: string) {
  return(
    <Card type="secondary" width="150px" margin="1">

      <a href={link}>
      <h1 className='text-2xl'>{name}</h1>
      <img src={image} className='object-contain'/>
      <p className='text-xs h-12'>{description}</p>

    </a>
      <Card.Footer>
        <Link target="_blank" href="https://github.com/geist-org/geist-ui">See on blog</Link>
      </Card.Footer>
    </Card>
  )
}