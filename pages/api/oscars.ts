import type { NextApiRequest, NextApiResponse } from 'next';

type Movie = {
  title: string;
  oscars: number;
};

const topOscarWinners: Movie[] = [
  { title: 'Ben-Hur (1959)', oscars: 11 },
  { title: 'Titanic (1997)', oscars: 11 },
  { title: 'The Lord of the Rings: The Return of the King (2003)', oscars: 11 },
  { title: 'West Side Story (1961)', oscars: 10 },
  { title: 'The English Patient (1996)', oscars: 9 },
  { title: 'The Last Emperor (1987)', oscars: 9 },
  { title: 'Gigi (1958)', oscars: 9 },
  { title: 'The Hurt Locker (2008)', oscars: 6 },
  { title: 'Chicago (2002)', oscars: 6 },
  { title: 'Gravity (2013)', oscars: 7 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Movie[]>) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Trata requisição OPTIONS (pré-vôo)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(topOscarWinners);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
