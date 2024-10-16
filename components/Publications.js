import bibtexParse from 'bibtex-parse-js';
import Image from 'next/image';
import { personalInfo } from '@/website.config';
import { CustomMDX } from '@/components/mdx';

function authorProcess(authorsStr, personalInfo) {
  const authors = authorsStr.split('and');
  const boldedAuthors = authors.map((author) => {
    author = author.trim().split(', ').reverse().join(' ').trim();
    return author.includes(personalInfo) ? `**${author}**` : author;
  });
  return boldedAuthors.join(', ');
}

export default function Publications({ bibtex }) {
  const parsed = bibtexParse.toJSON(bibtex);

  return (
    <ul className="flex flex-col gap-8 w-full">
      {parsed.map((item) => {
        const processedAuthors = authorProcess(item.entryTags.author, personalInfo.name);
        const isArxiv = item.entryTags.publisher?.toLowerCase().includes('arxiv');

        return (
          <li key={item.entryTags.title} className="flex gap-6 w-full">
            <div className="w-1/4 flex items-center justify-center relative -z-20"> {/* 添加 relative 和 z-0 */}
              <div className="relative inline-block group"> {/* 移除 overflow-hidden */}
                <div className="overflow-hidden"> {/* 新增一个 div 用于控制图片溢出 */}
                  {item.entryTags.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
                    >
                      <source src={item.entryTags.video} type="video/mp4" />
                      您的浏览器不支持视频标签。
                    </video>
                  ) : (
                    <Image
                      src={item.entryTags.image || "/project1.jpg"}
                      alt={item.entryTags.title}
                      width={300}
                      height={250}
                      className="w-full h-auto object-cover max-h-40 transition-all duration-300 ease-in-out group-hover:scale-110"
                    />
                  )}
                </div>
                {item.entryTags.publisher && (
                  <span className={`absolute top-2 -left-2 bg-black bg-opacity-80 px-2 py-1 rounded-r text-xs shadow-md ${isArxiv ? 'bg-white' : 'bg-black text-white'}`}>
                    {item.entryTags.publisher || 'arXiv'}
                  </span>
                )}
              </div>
            </div>
            <div className="w-3/4">
              <h2 className="text-xl font-semibold mb-2 dark:text-neutral-50">
                {item.entryTags.url ? (
                  <a href={item.entryTags.url} className="underline">
                    {item.entryTags.title.replace(/{|}/g, '')}
                  </a>
                ) : (
                  item.entryTags.title.replace(/{|}/g, '')
                )}
              </h2>
              <div className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">
                <CustomMDX source={processedAuthors} />
              </div>
              <div className="text-sm italic mb-2">
                {(item.entryTags.journal?.replace(/{|}/g, '') ||
                  item.entryTags.booktitle?.replace(/{|}/g, ''))
                  .replace(/\(|\)/g, '')}
              </div>
              {/* <div className="text-sm mb-2">{item.entryTags.year}</div> */}
              {/* {item.entryTags.abstract && (
                <div className="text-sm mb-2">{item.entryTags.abstract}</div>
              )} */}
              {item.entryTags.award && (
                <div className="flex items-center mb-2">
                  <Image
                    src={item.entryTags.award === 'Honorable Mention' ? "/honor.jpg" : "/best.jpg"}
                    alt={item.entryTags.award}
                    width={20}
                    height={20}
                    className="h-5 w-5 inline-block mr-2"
                  />
                  <span className="font-bold text-sm">{item.entryTags.award}</span>
                </div>
              )}
              <div className="flex gap-4 mt-2">
                {item.entryTags.website && (
                  <div className="flex items-center"> 
                    <Image
                      src="/website.svg" // 确保路径正确
                      alt="My Icon"
                      width={24} // 设置宽度
                      height={24} // 设置高度
                    />
                    <a href={item.entryTags.website} className="text-black px-2 py-1 rounded text-sm underline font-bold">
                      Website
                    </a>
                  </div>
                )}
                {item.entryTags.code && (
                  <div className="flex items-center"> 
                  <Image
                    src="/code.svg" // 确保路径正确
                    alt="My Icon"
                    width={22} // 设置宽度
                    height={22} // 设置高度
                  />
                  <a href={item.entryTags.code} className="text-black px-2 py-1 rounded text-sm underline font-bold">
                    Code
                  </a>
                  </div>
                )}
                {item.entryTags.paper && (
                  <div className="flex items-center"> 
                  <Image
                    src="/paper.svg" // 确保路径正确
                    alt="My Icon"
                    width={20} // 设置宽度
                    height={20} // 设置高度
                  />
                  <a href={item.entryTags.paper} className="text-black px-2 py-1 rounded text-sm underline font-bold">
                    Paper
                  </a>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
