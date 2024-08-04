import { FC, useEffect, useState } from 'react';
import './ticketStyle.css'
import { ITickets } from "../../Interfaces/ITickets";
import { getTickets } from '../../services/ticketServices';
import { useParams } from 'react-router-dom';

interface ComponentProps { }
const Tickets: FC<ComponentProps> = () => {
  const { id } = useParams();
  const [data, setData] = useState<ITickets>();

  useEffect(() => {
    loadTickets();
  }, [])

  const loadTickets = async () => {
    let result = await getTickets(Number(id));
    setData(result)
  }

  return (
    <div>
      {
        data?.boletos.map(item => (
          <div className="ticket-container">
            <div className="ticket-left">
              <div className="text-large">ASIENTO</div>
              <div className="text-huge">{item.numeroBoleto}</div>
              <div className="text-medium">{data.sala}</div>
            </div>
            <div className="ticket-right">
              <div className="text-large">SALA {data.sala}</div>
              <div className="text-medium">{data.proyeccion}</div>
              <div className="text-medium">{new Intl.DateTimeFormat().format(new Date(data.fecha))} | {new Intl.DateTimeFormat("en-us", { hour: "2-digit", minute: "2-digit" }).format(new Date(data.fecha))}</div>
              <div className="text-medium">{data.titulo}</div>
              <div className="cinepolis-logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSWglk-cOtUVBIUstK1-RSqLHsQGhkwFK9W4wKxBvJCFy8A8ZXXSm_9of7NpK0dFbVvA&usqp=CAU" alt="Cinépolis Logo" />
                <div>CINEPOLIS: ¡LO MEJOR DEL CINE!</div>
              </div>
            </div>
          </div>
        ))
      }
    </div>

  )
}

export default Tickets;