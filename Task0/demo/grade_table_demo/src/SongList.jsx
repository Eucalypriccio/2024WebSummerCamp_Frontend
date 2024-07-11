import React, { useState, useEffect } from 'react';
import './SongList.css'

const PAGE_SIZE = {
    SD: 35, // 暂定“旧乐谱”每页 35 行
    DX: 35, // 暂定“DX 2024”每页 35 行
};

function SongList() {
    const [songData, setSongData] = useState([]); // 存储歌曲信息
    const [activeTable, setActiveTable] = useState("SD"); // 默认显示“旧乐谱”
    const [currentPage, setCurrentPage] = useState(1); // 默认为第一页

    // 从 data.json 中加载数据
    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setSongData(data);
            });
    }, []);

    // 根据 DX Rating 对乐曲排序
    const sortSongs = (songs) => [...songs].sort((a, b) => b["DX-Rating"] - a["DX-Rating"])
    
    // 筛选出两类歌曲
    const sdSongs = sortSongs(songData.filter(song => song.category === "SD"));
    const dxSongs = sortSongs(songData.filter(song => song.category === "DX"));

    // 获取当前页面的歌曲数据
    const currentSongs = (activeTable === "SD") ? (sdSongs) : (dxSongs);

    // 当前页面需要展示的歌曲信息
    const startIndex = (currentPage - 1) * PAGE_SIZE[activeTable]; // 开始索引
    const endIndex = startIndex + PAGE_SIZE[activeTable]; // 结束索引
    const songsToDisplay = currentSongs.slice(startIndex, endIndex); // 切片

    // 计算总页数
    const totalPages = Math.ceil(currentSongs.length / PAGE_SIZE[activeTable]);

    // 处理切换页面
    const handlePageChange = (page) => setCurrentPage(page);

    function SongTable ({tab, songs, startIndex}) {
        // 根据歌曲难度返回不同的类名
        const getDifficultyClass = (difficulty) => {
            switch(difficulty) {
                case 'Basic': return 'Basic';
                case 'Advanced': return 'Advanced';
                case 'Expert': return 'Expert';
                case 'Master': return 'Master';
                case 'Re:MASTER': return 'reMASTER';
                case 'Utage': return 'Utage';
                default: return '';
            }
        };

        return (
            <div>
                <h2>{tab}</h2>
                <table className='song-table'>
                    <thead>
                        <tr>
                        <th>排名</th>
                        <th>乐曲名</th>
                        {/* <th>类别</th> */}
                        <th>难度</th>
                        {/* <th>等级</th> */}
                        <th>定数</th>
                        <th>达成率</th>
                        <th>DX Rating</th>
                        <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={song.name} className='song-row'>
                                <td>{startIndex + index + 1}</td>
                                <td>{song.name}</td>
                                {/* <td>{song.category}</td> */}
                                <td>
                                    <span className={`difficulty-capsule ${getDifficultyClass(song.difficulty)}`}>
                                        {song.difficulty === 'Re:MASTER' ? 're:MASTER' : song.difficulty + ' ' + song.level}
                                    </span>
                                </td>
                                {/* <td>{song.level}</td> */}
                                <td>{song["concrete-level"]}</td> 
                                <td>{`${song.achievement}%`}</td>
                                <td>
                                    <span className='DX-Rating'>
                                        {song["DX-Rating"]}
                                    </span>
                                </td>
                                <td>{"查看封面"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>舞萌 DX 成绩表格</h1>
            </div>
            <div>
                <button onClick={() => setActiveTable("SD")} disabled={activeTable === "SD"}>
                旧乐谱
                </button>
                <button onClick={() => setActiveTable("DX")} disabled={activeTable === "DX"}>
                DX 2024
                </button>
            </div>
            <div>
                {activeTable === "SD" ? 
                (<SongTable tab="旧乐谱" songs={songsToDisplay} startIndex={startIndex}/>) : 
                (<SongTable tab="DX 2024" songs={songsToDisplay} startIndex={startIndex}/>)
                }
            </div>
            <div>
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

function Pagination({currentPage, totalPages, onPageChange}) {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <ul className='pagination'>
            {pageNumbers.map(page => (
                <li key={page} className={(page === currentPage) ? ('active'):('')}>
                    <button onClick={() => onPageChange(page)}>{page}</button>
                </li>
            ))}
        </ul>
    );
}

export default SongList