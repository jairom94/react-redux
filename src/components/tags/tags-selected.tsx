import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { CloseIcon } from "../icons/close-icon";
import { getTags } from "../../pages/adverts/service";
import { AxiosError } from "axios";
import { useNotification } from "../ui/notification/context";

interface TagsSelectedProps {
  tagsSelected?: string[];
  onDeleteTagSelected: (tag: string) => void;
  onChangeTags:(newTag:string)=>void;
}
const TagsSelected = ({
  tagsSelected,
  onDeleteTagSelected,
  onChangeTags
}: TagsSelectedProps) => {
    const [tags,setTags] = useState<string[]>([])    
    const [disabledTags,setDisabledTags] = useState<string[]>([])  
    const [selectedTag,setSelectedTag] = useState<string>('')
    const { addNoti } = useNotification()
    const checkToDisabled = (tag:string) => disabledTags.includes(tag)
    useEffect(()=>{
        getTags()
        .then(data => setTags(data))
        .catch(err => {
            if(err instanceof AxiosError){
                addNoti({
                    message:`${err.response?.data.message} - ${err.response?.data.statusCode}`,
                    type:'error',
                    id:crypto.randomUUID(),
                    createdAt: Date.now()
                })
            }
        })
        if(Array.isArray(tagsSelected)){
          setDisabledTags([...tagsSelected])
        }

    },[])
  const handleDeleteTagSelected = useCallback((tag: string) => {  
  if(Array.isArray(tagsSelected) && tagsSelected.length === 0){
    setSelectedTag('')    
  }

  onDeleteTagSelected(tag);
  setDisabledTags(prev => [...prev.filter(t => t !== tag)])
}, [tagsSelected, onDeleteTagSelected]);
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>){    
    if (!e.target.value) return;
    const selected = e.target.value
    onChangeTags(selected)
    setDisabledTags(prev => [...prev,selected])
  }  

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex gap-2">
        {tagsSelected && tagsSelected.map((tag) => (
          <li
            key={tag}
            className={`group flex items-center justify-center gap-1 rounded-3xl border border-emerald-500 px-3 py-1 font-medium text-emerald-800 has-[button:hover]:border-red-500`}
          >
            <span className="leading-none transition-colors has-[+button:hover]:text-red-500">
              {tag}
            </span>
            <button
              onClick={()=>handleDeleteTagSelected(tag)}
              className="cursor-pointer p-0 text-xs hover:text-red-500"
            >
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>
      <select
        className="rounded-lg border border-emerald-500 px-3 py-1 font-medium text-emerald-800 focus:outline-emerald-700"
        value={selectedTag}
        onChange={handleChangeCategory}        
        name="tags"
        id="category"
      >
        <option value="">Seleccionar categoría</option>
        {tags.map((tag) => (
          <option 
          key={tag} 
          value={tag}
          disabled={checkToDisabled(tag)}
          >
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagsSelected;
