import React, {useState} from 'react';
import './App.css';


const initialBoards = [
    {
        id: 10, title: "Users", items: [{id: 1, name: 'Victor'}, {id: 3, name: 'Semen'}, {id: 4, name: 'Mariya'}
        ]
    },
    {id: 22, title: "Mentors", items: [{id: 2, name: 'Lena'}, {id: 5, name: 'Yuriy'}]}
]
type InitialTypes = Array<BoarsTypes>
type BoarsTypes = {
    id: number
    title: string
    items: Array<{ id: number, name: string }>
}

type ItemType = { id: number; name: string };

function App() {
    const [boards, setBoards] = useState<InitialTypes>(initialBoards)
    const [currentItem, setCurrentItem] = useState<null | ItemType>(null)
    const [currentBoard, setCurrentBoard] = useState<null | BoarsTypes>(null)


    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()

        if (e.currentTarget.className === 'item') {
            e.currentTarget.className = 'item active_item'
        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = 'item'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, board: BoarsTypes, item: ItemType) {
        e.preventDefault()
        console.log('item')
        if (currentItem && currentBoard) {
            const currentIndex = currentBoard.items.indexOf(currentItem)
            const dropIndex = board.items.indexOf(item)
            currentBoard.items.splice(currentIndex, 1)
            if (currentIndex === board.items.length) {
                board.items.splice(dropIndex, 0, currentItem)
            } else {
                board.items.splice(dropIndex, 0, currentItem)

            }
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }
        e.currentTarget.className = 'item'
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: BoarsTypes, item: ItemType) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.className = 'item'
    }

    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: BoarsTypes) {
        e.preventDefault()
        if (currentBoard && currentItem) {
            if (board.items.indexOf(currentItem) < 0) {
                board.items.push(currentItem)
                const currentIndex = currentBoard.items.indexOf(currentItem)
                currentBoard.items.splice(currentIndex, 1)
                setBoards(boards.map(b => {

                    if (b.id === board.id) {
                        return board
                    }
                    if (b.id === currentBoard.id) {
                        return currentBoard
                    }
                    return b
                }))
            } else {
                return
            }

        }


    }

    return (
        <div className="app">
            {boards.map(board =>
                <div
                    className='board'
                    key={board.id + board.title}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >
                    <div className="title">{board.title}</div>
                    {board.items.map(item =>
                        <div
                            className='item'
                            key={item.id + item.name}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={((e) => dragLeaveHandler(e))}
                            onDragStart={(e) => dragStartHandler(e, board, item)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, item)}
                            draggable={true}
                        >

                            {item.name}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
