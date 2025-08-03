import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { CloseIcon } from "../icons/close-icon";
// import { getTags } from "../../pages/adverts/service";
// import { AxiosError } from "axios";
// import { useNotification } from "../ui/notification/context";
import { useAppSelector } from "../../store";
import { getTagsRedux } from "../../store/selectors";
// import { tagsLoaded } from "../../store/actions";
import type { Tag } from "../../pages/adverts/types";

interface TagsSelectedProps {
  tagsSelected: Tag[];
  onDeleteTagSelected: (tag: Tag) => void;
  onChangeTags: (newTag: Tag) => void;
}
const TagsSelected = ({
  tagsSelected,
  onDeleteTagSelected,
  onChangeTags,
}: TagsSelectedProps) => {
  // const [tags,setTags] = useState<string[]>([])
  // const dispatch = useAppDispatch();
  const tags = useAppSelector(getTagsRedux);
  const [disabledTags, setDisabledTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | "">("");
  // const { addNoti } = useNotification()
  const checkToDisabled = (tag: Tag) => disabledTags.includes(tag);
  useEffect(() => {
    setDisabledTags([...tagsSelected]);    
  }, [tagsSelected]);
  const handleDeleteTagSelected = useCallback(
    (tag: Tag) => {
      if (Array.isArray(tagsSelected) && tagsSelected.length === 0) {
        setSelectedTag("");
      }
      onDeleteTagSelected(tag);
      setDisabledTags((prev) => [...prev.filter((t) => t !== tag)]);
    },
    [tagsSelected, onDeleteTagSelected],
  );
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    if (!e.target.value) return;
    const selected = e.target.value as Tag;
    setSelectedTag(selected)
    onChangeTags(selected);
    setDisabledTags((prev) => [...prev, selected]);
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex gap-2">
        {tagsSelected.map((tag) => (
            <li
              key={tag}
              className={`group flex items-center justify-center gap-1 rounded-3xl border border-emerald-500 px-3 py-1 font-medium text-emerald-800 has-[button:hover]:border-red-500`}
            >
              <span className="leading-none transition-colors has-[+button:hover]:text-red-500">
                {tag}
              </span>
              <button
                onClick={() => handleDeleteTagSelected(tag)}
                className="cursor-pointer p-0 text-xs hover:text-red-500"
              >
                <CloseIcon />
              </button>
            </li>
          ))}
      </ul>
      <select
        className="rounded-lg border border-emerald-500 px-3 py-1 font-medium text-emerald-800 focus:outline-emerald-800 transition-all duration-100 hover:outline-emerald-800 hover:outline-2 cursor-pointer"
        value={selectedTag}
        onChange={handleChangeCategory}
        name="tags"
        id="category"
      >
        <option value="">Seleccionar categoría</option>
        {tags.map((tag) => (
          <option key={tag} value={tag} disabled={checkToDisabled(tag)}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagsSelected;
