import Button from '@/components/common/Button';

export default function About() {
  return (
    <div>
      <div className="mt-4">
        <Button size="small" color="blue">Small Blue Button</Button>
        <Button size="medium" color="red" className="ml-2">Medium Red Button</Button>
        <Button size="large" color="green" className="ml-2">Large Green Button</Button>
        <Button size="large" color="yellow" className="ml-2">Large Yellow Button</Button>
      </div>
    </div>
  );
}