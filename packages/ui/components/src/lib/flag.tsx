import { css, html } from 'react-strict-dom';

const FLAG_CDN = 'https://flagcdn.com/w80';

export type FlagProps = {
  code: string;
  width: number;
  height: number;
  alt: string;
};

export function Flag({ code, width, height, alt }: FlagProps) {
  return (
    <html.img
      src={`${FLAG_CDN}/${code}.png`}
      alt={alt}
      style={styles.size(width, height)}
    />
  );
}

const styles = css.create({
  size: (width: number, height: number) => ({
    width,
    height,
  }),
});
