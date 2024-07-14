import React, { useState, useEffect, useRef } from 'react';
import './SongList.css'

const PAGE_SIZE = {
    SD: 35, // 暂定“旧乐谱”每页 35 行
    DX: 35, // 暂定“DX 2024”每页 35 行
};

function SongList() {
    const [songData, setSongData] = useState([]); // 存储歌曲信息
    const [activeTable, setActiveTable] = useState("SD"); // 默认显示“旧乐谱”
    const [currentPage, setCurrentPage] = useState(1); // 默认为第一页

    const [isModalOpen, setIsModalOpen] = useState(false); // 模态框默认关闭

    const [searchTerm, setSearchTerm] = useState(''); // 搜索词状态

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

    // 获取当前表格的歌曲数据
    const currentSongs = (activeTable === "SD") ? (sdSongs) : (dxSongs);

    // 根据搜索词筛选歌曲
    const filteredSongs = currentSongs.filter(song => 
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 当前页面需要展示的歌曲信息
    const startIndex = (currentPage - 1) * PAGE_SIZE[activeTable]; // 开始索引
    const endIndex = startIndex + PAGE_SIZE[activeTable]; // 结束索引
    const songsToDisplay = filteredSongs.slice(startIndex, endIndex); // 切片

    // 计算总页数
    const totalPages = Math.ceil(filteredSongs.length / PAGE_SIZE[activeTable]);

    // 处理切换页面
    const handlePageChange = (page) => setCurrentPage(page);

    // 处理切换表格
    const handleTableSwitch = (table) => setActiveTable(table);

    // 处理搜索词变化
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // 表格主体组件
    function SongTable ({songs, startIndex}) {
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

        // 将歌曲达成率换算成等级
        const getAchievementRank = (achievement) => {
            if ( achievement >= 100.5 ) {
                return 'SSS\+';
            }
            else if ( achievement >= 100 ) {
                return 'SSS';
            }
            else if ( achievement >= 99.5 ) {
                return 'SS\+';
            }
            else if ( achievement >= 99 ) {
                return 'SS';
            }
            else if ( achievement >= 98 ) {
                return 'S\+';
            }
            else if ( achievement >= 97 ) {
                return 'S';
            }
            else {
                return '';
            }
        }

        return (
            <div>
                {/* <h2>{tab}</h2> */}
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
                                <td>
                                    <div className="song-name-container">
                                        {song.name}
                                        <div className="song-tooltip">
                                            <p>Id: unknown</p>
                                            <p>Artist: unknown</p>
                                            <p>Version: unknown</p>
                                            <p>Genre: unknown</p>
                                            <p>BPM: unknown</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`difficulty-capsule ${getDifficultyClass(song.difficulty)}`}>
                                        {song.difficulty + ' ' + song.level}
                                    </span>
                                </td>
                                <td>{song["concrete-level"]}</td> 
                                <td>
                                    <span>
                                    {`${song.achievement}%`}
                                    </span>
                                    <span className={`achievement-capsule ${getAchievementRank(song.achievement)}`}>
                                        {getAchievementRank(song.achievement)}
                                    </span>
                                </td>
                                <td>
                                    <span className='DX-Rating'>
                                        {song["DX-Rating"]}
                                    </span>
                                </td>
                                <td>
                                    <div className="cover-container"> {/* 添加一个容器包裹图标和文字 */}
                                    <button onClick={() => setIsModalOpen(true)}>
                                        <img src="/cover_icon.png" alt="封面" />
                                    </button>
                                    <span className="cover-tooltip">查看封面</span> {/* 添加文字 */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* 模态框 */}
                {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    <span className="close" onClick={() => setIsModalOpen(false)}>×</span>
                    <img src='public/this_is_cover.png' alt='cover' />
                    </div>
                </div>
                )}
            </div>
        );
    }

    // 表格分页组件
    function Pagination({currentPage, totalPages, onPageChange}) {

        return (
            <div className='pagination'>
                <button onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage !== 1 ? 'active' : ''}>
                    &lt;
                </button>
                <button onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage !== totalPages ? 'active' : ''}>
                    &gt;
                </button>
            </div>
        );
    }

    function TableSwitcher ({activeTable, onTableSwitch}) {

        const tableSwitcherRef = useRef(null); // 用于获取 TableSwitcher 元素的引用
        const underlineRef = useRef(null); // 用于获取下划线元素的引用

        useEffect(() => {
            // 获取当前激活按钮和下划线的 DOM 元素
            const activeButton = tableSwitcherRef.current.querySelector('button.active');
            const underline = underlineRef.current;
        
            // 更新下划线的位置
            if (activeButton && underline) {
                const activeButtonRect = activeButton.getBoundingClientRect();
                underline.style.width = `${activeButtonRect.width}px`;
                underline.style.transform = `translateX(${activeButtonRect.left}px)`;
            }
        }, [activeTable]); // 当 activeTable 变化时，更新下划线的位置

        return (
            <div className='table-switcher' ref={tableSwitcherRef}>
                <button onClick={() => onTableSwitch("SD")} className={activeTable === "SD" ? 'active' : ''}>
                旧乐谱
                </button>
                <button onClick={() => onTableSwitch("DX")} className={activeTable === "DX" ? 'active' : ''}>
                DX 2024
                </button>
            </div>
        );
    }

    // 切换表格组件
    function TableSwitcherContainer ({activeTable, onTableSwitch}) {

        return (
            <div className='table-switcher-container'>
                <TableSwitcher activeTable={activeTable} onTableSwitch={onTableSwitch} />
            </div>
        );
    }

    // 将 SongTable 和 Pagination 封装在一个 container 中
    function SongTableContainer ({songs, startIndex, currentPage, totalPages, onPageChange}) {
        return (
            <div className='song-table-container'>
                <SongTable songs={songs} startIndex={startIndex} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
        )
    }

    return (
        <div className='song-list-card'>
            <div>
                <h1>舞萌 DX 成绩表格</h1>
            </div>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="查找乐曲" 
                    value={searchTerm} 
                    onChange={handleSearchTermChange} 
                />
            </div>
            <TableSwitcherContainer activeTable={activeTable} onTableSwitch={handleTableSwitch} />
            <div>
                {activeTable === "SD" ?
                (<SongTableContainer
                    songs={songsToDisplay}
                    startIndex={startIndex}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange} />) :
                (<SongTableContainer
                    songs={songsToDisplay}
                    startIndex={startIndex}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange} />
                )
                }
            </div>
        </div>
    );
}

export default SongList